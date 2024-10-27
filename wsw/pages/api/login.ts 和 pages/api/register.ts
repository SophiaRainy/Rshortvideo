// 在文件顶部添加这个接口
interface User {
  id: number;
  username: string;
  password: string;
}

// 然后在查询结果中使用这个类型
const [users] = await pool.query<User[]>('SELECT * FROM users WHERE username = ?', [username]);
const user = users[0];

// 在 register.ts 中
const [existingUsers] = await pool.query<User[]>('SELECT * FROM users WHERE username = ?', [username]);
if (existingUsers.length > 0) {
  return res.status(400).json({ message: '用户名已存在' });
}
