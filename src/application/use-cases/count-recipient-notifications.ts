import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../repositories/notifications-repository';

interface CountRecicipientNotificationsRequest {
  recipientId: string;
}

interface CountRecicipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecicipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountRecicipientNotificationsRequest,
  ): Promise<CountRecicipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
