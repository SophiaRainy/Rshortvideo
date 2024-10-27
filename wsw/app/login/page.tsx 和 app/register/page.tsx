// ... 其他代码保持不变

try {
  // ... 现有的代码
} catch (err: unknown) {
  setError(err instanceof Error ? err.message : '发生未知错误');
}

// ... 其他代码保持不变
