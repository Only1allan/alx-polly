import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllPolls } from '@/app/lib/actions/poll-actions';

export default async function PublicPollsPage() {
  const { polls, error } = await getAllPolls();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-800">
            ALX Polly
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Discover Public Polls
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse and participate in polls created by the community. 
            Create an account to make your own polls!
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/register">Create Your First Poll</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/login">Login to Dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {polls && polls.length > 0 ? (
            polls.map((poll) => (
              <Card key={poll.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">
                    {poll.question}
                  </CardTitle>
                  <CardDescription>
                    {poll.options.length} options • Created {new Date(poll.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {poll.options.slice(0, 3).map((option: string, index: number) => (
                      <div key={index} className="text-sm text-slate-600">
                        • {option}
                      </div>
                    ))}
                    {poll.options.length > 3 && (
                      <div className="text-sm text-slate-500">
                        +{poll.options.length - 3} more options
                      </div>
                    )}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/polls/${poll.id}`}>
                      View & Vote
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center col-span-full">
              <h2 className="text-xl font-semibold mb-2">No polls yet</h2>
              <p className="text-slate-500 mb-6">
                Be the first to create a poll and start the conversation!
              </p>
              <Button asChild>
                <Link href="/register">Create First Poll</Link>
              </Button>
            </div>
          )}
        </div>

        {error && (
          <div className="text-center py-4">
            <div className="text-red-500">{error}</div>
          </div>
        )}
      </main>

      <footer className="border-t bg-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} ALX Polly. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
