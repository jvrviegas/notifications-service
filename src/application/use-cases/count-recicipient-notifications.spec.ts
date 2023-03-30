import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecicipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecicipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-one' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-one' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-two' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-one',
    });

    expect(count).toEqual(2);
  });
});
