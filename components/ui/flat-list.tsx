import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FlatListProps<T> {
  /** The array of data to render */
  data: T[] | null | undefined;
  
  /** Function to render each item in the data array */
  renderItem: (item: T, index: number) => ReactNode;
  
  /** Function to extract a unique key for each item */
  keyExtractor?: (item: T, index: number) => string | number;
  
  /** Component to render when the list is empty */
  ListEmptyComponent?: ReactNode;
  
  /** Component to render at the top of the list */
  ListHeaderComponent?: ReactNode;
  
  /** Component to render at the bottom of the list */
  ListFooterComponent?: ReactNode;
  
  /** Component to render when there is an error */
  ErrorComponent?: ReactNode;
  
  /** Component to render when the list is loading */
  LoadingComponent?: ReactNode;
  
  /** Boolean indicating if the list is in a loading state */
  isLoading?: boolean;
  
  /** Boolean indicating if the list is in an error state */
  isError?: boolean;
  
  /** Custom class name for the wrapper div */
  className?: string;
  
  /** Custom class name for the list container */
  listClassName?: string;
}

export function FlatList<T>({
  data,
  renderItem,
  keyExtractor,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
  ErrorComponent,
  LoadingComponent,
  isLoading = false,
  isError = false,
  className,
  listClassName,
}: FlatListProps<T>) {
  if (isError && ErrorComponent) {
    return <>{ErrorComponent}</>;
  }

  if (isLoading && LoadingComponent) {
    return <>{LoadingComponent}</>;
  }

  const items = data || [];
  const isEmpty = items.length === 0;

  if (isEmpty && ListEmptyComponent) {
    return (
      <div className={cn("flex flex-col w-full", className)}>
        {ListHeaderComponent && <div className="w-full">{ListHeaderComponent}</div>}
        <div className="w-full">{ListEmptyComponent}</div>
        {ListFooterComponent && <div className="w-full">{ListFooterComponent}</div>}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {ListHeaderComponent && <div className="w-full">{ListHeaderComponent}</div>}
      
      <div className={cn("w-full", listClassName)}>
        {items.map((item, index) => {
          const key = keyExtractor ? keyExtractor(item, index) : index;
          return <React.Fragment key={key}>{renderItem(item, index)}</React.Fragment>;
        })}
      </div>
      
      {ListFooterComponent && <div className="w-full">{ListFooterComponent}</div>}
    </div>
  );
}
