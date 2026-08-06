import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';

export interface CreateServerParams {
  name: string;
  pterodactylUserId: number;
  eggId: number;
  nestId: number;
  nodeId: number;
  dockerImage: string;
  startup: string;
  environment: Record<string, unknown>;
  ramGo: number;
  cpuCores: number;
  diskGo: number;
}

export interface CreatedServer {
  id: number;
  identifier: string;
}

@Injectable()
export class PterodactylService {
  private readonly logger = new Logger(PterodactylService.name);

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private get panelUrl(): string {
    const url = this.config.get<string>('PTERODACTYL_PANEL_URL');
    if (!url) {
      throw new BadGatewayException(
        'PTERODACTYL_PANEL_URL non configuré — impossible de contacter le panel',
      );
    }
    return url.replace(/\/$/, '');
  }

  private appRequestConfig(): AxiosRequestConfig {
    const apiKey = this.config.get<string>('PTERODACTYL_API_KEY');
    if (!apiKey) {
      throw new BadGatewayException(
        'PTERODACTYL_API_KEY non configuré — impossible de contacter le panel',
      );
    }
    return {
      baseURL: `${this.panelUrl}/api/application`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  }

  private clientRequestConfig(): AxiosRequestConfig {
    const apiKey = this.config.get<string>('PTERODACTYL_CLIENT_API_KEY');
    if (!apiKey) {
      throw new BadGatewayException(
        'PTERODACTYL_CLIENT_API_KEY non configuré — impossible de contacter le panel',
      );
    }
    return {
      baseURL: `${this.panelUrl}/api/client`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await firstValueFrom(this.http.request<T>(config));
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      this.logger.error(
        `Appel Pterodactyl échoué [${config.method} ${config.url}]: ${axiosError.message} ${JSON.stringify(axiosError.response?.data ?? {})}`,
      );
      throw new BadGatewayException(
        'Le panel Pterodactyl est injoignable ou a renvoyé une erreur',
      );
    }
  }

  async getOrCreateUser(user: { id: string; email: string }): Promise<number> {
    const base = this.appRequestConfig();

    const existing = await this.request<{
      data: Array<{ attributes: { id: number } }>;
    }>({
      ...base,
      method: 'GET',
      url: `/users?filter[email]=${encodeURIComponent(user.email)}`,
    });
    if (existing.data.length > 0) {
      return existing.data[0].attributes.id;
    }

    const username = `${user.email.split('@')[0]}_${crypto.randomBytes(3).toString('hex')}`;
    const created = await this.request<{ attributes: { id: number } }>({
      ...base,
      method: 'POST',
      url: '/users',
      data: {
        email: user.email,
        username,
        first_name: 'Client',
        last_name: user.id.slice(0, 8),
        password: crypto.randomBytes(16).toString('hex'),
      },
    });
    return created.attributes.id;
  }

  async getFreeAllocation(nodeId: number): Promise<number> {
    const base = this.appRequestConfig();
    const allocations = await this.request<{
      data: Array<{ attributes: { id: number } }>;
    }>({
      ...base,
      method: 'GET',
      url: `/nodes/${nodeId}/allocations?filter[assigned]=false&per_page=1`,
    });
    if (allocations.data.length === 0) {
      throw new BadGatewayException(
        `Aucune allocation libre sur le nœud Pterodactyl ${nodeId}`,
      );
    }
    return allocations.data[0].attributes.id;
  }

  async createServer(params: CreateServerParams): Promise<CreatedServer> {
    const base = this.appRequestConfig();
    const allocationId = await this.getFreeAllocation(params.nodeId);

    const created = await this.request<{
      attributes: { id: number; identifier: string };
    }>({
      ...base,
      method: 'POST',
      url: '/servers',
      data: {
        name: params.name,
        user: params.pterodactylUserId,
        egg: params.eggId,
        nest: params.nestId,
        docker_image: params.dockerImage,
        startup: params.startup,
        environment: params.environment,
        limits: {
          memory: params.ramGo * 1024,
          swap: 0,
          disk: params.diskGo * 1024,
          io: 500,
          cpu: params.cpuCores * 100,
        },
        feature_limits: { databases: 1, backups: 1, allocations: 1 },
        allocation: { default: allocationId },
      },
    });

    return {
      id: created.attributes.id,
      identifier: created.attributes.identifier,
    };
  }

  async suspendServer(pterodactylServerId: number): Promise<void> {
    await this.request({
      ...this.appRequestConfig(),
      method: 'POST',
      url: `/servers/${pterodactylServerId}/suspend`,
    });
  }

  async deleteServer(pterodactylServerId: number): Promise<void> {
    await this.request({
      ...this.appRequestConfig(),
      method: 'DELETE',
      url: `/servers/${pterodactylServerId}`,
    });
  }

  async sendPowerAction(
    identifier: string,
    signal: 'start' | 'stop' | 'restart' | 'kill',
  ): Promise<void> {
    await this.request({
      ...this.clientRequestConfig(),
      method: 'POST',
      url: `/servers/${identifier}/power`,
      data: { signal },
    });
  }

  async getServerResources(identifier: string): Promise<unknown> {
    return this.request({
      ...this.clientRequestConfig(),
      method: 'GET',
      url: `/servers/${identifier}/resources`,
    });
  }
}
