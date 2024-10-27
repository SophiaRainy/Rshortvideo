import React, { useState } from 'react';

interface Comment {
  id: string;
  text: string;
  user: string; // 假设每条评论都有一个用户
}

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments: initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(), // 使用时间戳作为临时ID
        text: newComment,
        user: 'Anonymous', // 假设用户是匿名的，你可以根据实际情况修改
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4">
        {comments.map((comment) => (
          <div key={comment.id} className="mb-2 p-2 bg-gray-100 rounded-lg">
            <p className="font-bold">{comment.user}</p>
            <p className="text-gray-800">{comment.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex p-4 border-t">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="添加评论..."
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          发送
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
