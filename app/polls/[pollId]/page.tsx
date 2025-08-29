import { PollView } from "@/components/polls/poll-view";

export default function PollPage({ params }: { params: { pollId: string } }) {
  return <PollView pollId={params.pollId} />;
}
