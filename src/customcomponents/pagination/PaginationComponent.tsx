"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { FC } from 'react';
import { usePathname } from 'next/navigation';

type PaginationComponentProps = {
  paginationLength: number
}

const PaginationComponent: FC<PaginationComponentProps> = ({ paginationLength }) => {

  const pathName = usePathname();
  const numPage = pathName[pathName.length - 1];
  const paginationRounded = Math.ceil(paginationLength);
  const arrayOfDigits = Array.from(Array(paginationRounded).keys());

  if (arrayOfDigits.length === 1) {
    arrayOfDigits[0] = 1;
    arrayOfDigits[1] = 2;
  } else {
    arrayOfDigits.splice(0, 1)
  }

  const activeFunc = (i: number) => {
    let activeLink: boolean = false;
    if (Number(numPage) == i) {
      activeLink = true;
    }
    return activeLink;
  }

  const PaginationPreviousFunc = (numPage: string) => {
    if (Number(numPage) == 1) {
      return;
    } else {
      let previouspage = Number(numPage) - 1;
      return previouspage.toString();
    }

  }

  const PaginationNextFunc = (numPage: string) => {
    if (Number(numPage) == arrayOfDigits.length) {
      return;
    } else {
      let previouspage = Number(numPage) + 1;
      return previouspage.toString();
    }
  }

  return (
    <Pagination className="mt-2 mb-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={PaginationPreviousFunc(numPage)} />
        </PaginationItem>
        {arrayOfDigits.map((i) =>
          <PaginationItem key={i} >
            <PaginationLink href={`${i}`} isActive={activeFunc(i)} >{i}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={PaginationNextFunc(numPage)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComponent;