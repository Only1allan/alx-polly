import { PollView } from "@/components/polls/poll-view";

export default function PollPage({ params }: { params: { id: string } }) {
  return <PollView pollId={params.id} />;
}
