const cron = require('node-cron');
const db = require('./db');

// Check every minute for posts to publish
cron.schedule('* * * * *', async () => {
  const now = new Date();
  try {
    const [blogs] = await db.query(
      'SELECT * FROM blogs WHERE status = "scheduled" AND publish_date <= ?',
      [now]
    );

    blogs.forEach(async (blog) => {
      await db.query('UPDATE blogs SET status = "published" WHERE id = ?', [blog.id]);
    });
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});
