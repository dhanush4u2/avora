interface StackedCardProps {
  children: React.ReactNode;
  index: number;
}

const StackedCard = ({ children }: StackedCardProps) => {
  return <section className="relative w-full">{children}</section>;
};

export default StackedCard;
