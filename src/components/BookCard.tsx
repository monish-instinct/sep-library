
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface BookData {
  id: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  status: "available" | "borrowed" | "reserved";
  rating: number;
}

interface BookCardProps {
  book: BookData;
  className?: string;
  onClick?: () => void;
}

const BookCard = ({ book, className, onClick }: BookCardProps) => {
  const statusColors = {
    available: "bg-green-100 text-green-800",
    borrowed: "bg-orange-100 text-orange-800",
    reserved: "bg-blue-100 text-blue-800",
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-yellow-500"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-yellow-500"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    // Add empty stars to make a total of 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-4 h-4 text-gray-300"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      );
    }

    return stars;
  };

  return (
    <Card
      className={cn(
        "overflow-hidden border hover:border-library-200 hover:shadow-md transition-all cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-[2/3] w-full relative">
        <img
          src={book.cover}
          alt={book.title}
          className="object-cover w-full h-full"
        />
        <Badge
          className={cn(
            "absolute top-2 right-2 font-normal",
            statusColors[book.status]
          )}
        >
          {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-sm line-clamp-1" title={book.title}>
          {book.title}
        </h3>
        <p className="text-gray-500 text-xs mt-1">{book.author}</p>
        <div className="flex items-center justify-between mt-2">
          <Badge variant="outline" className="text-xs font-normal">
            {book.genre}
          </Badge>
          <div className="flex">{renderStars(book.rating)}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
