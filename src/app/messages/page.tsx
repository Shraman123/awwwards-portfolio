import fs from 'fs/promises';
import path from 'path';

export default async function MessagesPage() {
  const filePath = path.join(process.cwd(), 'messages.json');
  let messages = [];
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    messages = JSON.parse(file).reverse(); // Show newest first
  } catch(e) {
    // File not found
  }

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] p-10 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-4">
          <span className="w-4 h-4 rounded-full bg-[#afc6ff] animate-pulse"></span>
          Inbox ({messages.length})
        </h1>
        
        {messages.length === 0 ? (
          <div className="border border-white/10 p-10 rounded-2xl text-center opacity-50">
            No messages yet.
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((m: any) => (
              <div key={m.id} className="border border-white/20 bg-white/5 p-6 rounded-2xl hover:border-[#afc6ff]/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xl font-bold text-white mb-1">{m.name}</div>
                    <div className="text-sm text-[#afc6ff]">{m.email}</div>
                  </div>
                  <div className="text-xs opacity-50 text-right">
                    {new Date(m.date).toLocaleString()}
                  </div>
                </div>
                <div className="text-sm leading-relaxed opacity-80 whitespace-pre-wrap bg-black/20 p-4 rounded-xl border border-white/5">
                  {m.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
