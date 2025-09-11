'use client';

import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PollResults } from '@/components/ui/poll-results';
import { getPollResults, submitVote } from '@/app/lib/actions/poll-actions';
import { useAuth } from '@/app/lib/context/auth-context';

interface PollData {
  id: string;
  question: string;
  options: string[];
  created_at: string;
  created_by: string;
}

interface PollResultData {
  option: string;
  votes: number;
}

export default function PollDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const [poll, setPoll] = useState<PollData | null>(null);
  const [results, setResults] = useState<PollResultData[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPollData = async () => {
    try {
      setLoading(true);
      const result = await getPollResults(id);
      
      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.poll && result.results) {
        setPoll(result.poll);
        setResults(result.results);
        setTotalVotes(result.totalVotes || 0);
      }
    } catch (err) {
      setError('Failed to load poll data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPollData();
  }, [id]);

  const handleVote = async () => {
    if (!selectedOption || !poll) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Find the option index
      const optionIndex = poll.options.indexOf(selectedOption);
      
      if (optionIndex === -1) {
        setError('Invalid option selected');
        setIsSubmitting(false);
        return;
      }

      const result = await submitVote(poll.id, optionIndex);
      
      if (result.error) {
        setError(result.error);
      } else {
        setHasVoted(true);
        // Refresh poll data to show updated results
        await fetchPollData();
      }
    } catch (err) {
      setError('Failed to submit vote');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2 text-red-600">
            {error || 'Poll not found'}
          </h2>
          <Button asChild>
            <Link href="/polls">Back to Polls</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/polls" className="text-blue-600 hover:underline">
          &larr; Back to Polls
        </Link>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/polls/${id}/edit`}>Edit Poll</Link>
          </Button>
          <Button variant="outline" className="text-red-500 hover:text-red-700">
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{poll.question}</CardTitle>
          <CardDescription>
            {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} total
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {!hasVoted && !user && (
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-md mb-4">
              You must be logged in to vote on this poll.
            </div>
          )}

          {!hasVoted && user ? (
            <div className="space-y-3">
              {poll.options.map((option, index) => (
                <div 
                  key={index} 
                  className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedOption === option ? 'border-blue-500 bg-blue-50' : 'hover:bg-slate-50'}`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </div>
              ))}
              <Button 
                onClick={handleVote} 
                disabled={!selectedOption || isSubmitting} 
                className="mt-4"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Vote'}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((result, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{result.option}</span>
                    <span>{result.votes} votes ({getPercentage(result.votes)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${getPercentage(result.votes)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="text-sm text-slate-500 flex justify-between">
          <span>Poll ID: {poll.id}</span>
          <span>Created on {new Date(poll.created_at).toLocaleDateString()}</span>
        </CardFooter>
      </Card>

      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-4">Share this poll</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              // You could add a toast notification here
            }}
          >
            Copy Link
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              const url = encodeURIComponent(window.location.href);
              const text = encodeURIComponent(`Check out this poll: ${poll.question}`);
              window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
            }}
          >
            Share on Twitter
          </Button>
        </div>
      </div>
    </div>
  );
}
