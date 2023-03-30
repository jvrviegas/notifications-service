import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecicipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecicipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-one',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-one' }),
        expect.objectContaining({ recipientId: 'recipient-one' }),
      ]),
    );
  });
});
