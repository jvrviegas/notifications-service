import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../repositories/notifications-repository';

interface GetRecicipientNotificationsRequest {
  recipientId: string;
}

interface GetRecicipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecicipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetRecicipientNotificationsRequest,
  ): Promise<GetRecicipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
