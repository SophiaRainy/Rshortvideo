import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // 检查用户名是否已存在
      const [existingUsers] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if ((existingUsers as any[]).length > 0) {
        return res.status(400).json({ message: '用户名已存在' });
      }

      // 加密密码
      const hashedPassword = await bcrypt.hash(password, 10);

      // 添加新用户
      await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

      res.status(200).json({ message: '注册成功' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: '注册失败' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
