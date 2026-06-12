/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * API Service for LingoLion
 * Handles all backend communication
 */

const API_BASE = process.env.VITE_API_URL || 'http://localhost:5000';

export interface ChatRequest {
  message: string;
  language: string;
  scenario: string;
  sessionId?: string;
}

export interface ChatResponse {
  message: string;
  timestamp: number;
}

export interface ContactRequest {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
  email: string;
  token: string;
  message: string;
}

export class APIClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: object
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    return response.json();
  }

  // Auth methods
  async register(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('POST', '/api/auth/register', {
      email,
      password,
    });
    return response;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('POST', '/api/auth/login', {
      email,
      password,
    });
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
    }
    return response;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Chat methods
  async createChatSession(
    language: string,
    scenario: string
  ): Promise<{ id: string }> {
    return this.request('POST', '/api/chat/session', {
      language,
      scenario,
    });
  }

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    return this.request('POST', '/api/chat', request);
  }

  // Contact methods
  async submitContact(data: ContactRequest): Promise<{ contactId: string }> {
    return this.request('POST', '/api/contact', data);
  }

  async getContact(id: string): Promise<any> {
    return this.request('GET', `/api/contact/${id}`);
  }

  // Admin methods
  async getContacts(): Promise<any[]> {
    return this.request('GET', '/api/admin/contacts');
  }

  async updateContactStatus(id: string, status: string): Promise<any> {
    return this.request('PATCH', `/api/admin/contact/${id}/status`, { status });
  }

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    return this.request('GET', '/api/health');
  }
}

export const apiClient = new APIClient();
