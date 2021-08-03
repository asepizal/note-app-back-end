const amqp = require('amqplib');

const ProducerService = {
  sendMessage: async (queue, message) => {
    //   buat connection ke RabbitMQ server
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    // buat channel
    const channel = await connection.createChannel();

    // buat queue
    await channel.assertQueue(queue, {
      durable: true,
    });

    // kirim pesan dalam bentuk Buffer ke queue
    await channel.sendToQueue(queue, Buffer.from(message));

    // tutup koneksi
    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

module.exports = ProducerService;