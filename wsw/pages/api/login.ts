import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // 测试账号
    const testUser = {
      username: 'testuser',
      password: 'testpassword123'
    };

    if (username === testUser.username && password === testUser.password) {
      res.status(200).json({ message: '登录成功' });
    } else {
      res.status(401).json({ message: '用户名或密码错误' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
