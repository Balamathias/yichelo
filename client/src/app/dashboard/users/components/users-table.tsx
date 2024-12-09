'use client'

import React, { use, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginatedUsers } from "@/@types/user";
import Pagination from '../../components/pagination.server';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { LucideTrash, LucideEdit, LucideEye, LucideCheckCircle, LucideXCircle } from 'lucide-react';
import Link from 'next/link';
import DynamicModal from '@/components/dynamic-modal';
import { useDeleteUser } from '@/lib/react-query/user.query';
import { DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AvatarImage } from '@radix-ui/react-avatar';

interface UserTableProps {
  promisedUsers: Promise<PaginatedUsers>;
}

const UserTable: React.FC<UserTableProps> = ({ promisedUsers }) => {
  const users = use(promisedUsers);
  const currentPage = users?.pagination?.currentPage || 1;
  const totalPages = users?.pagination?.totalPages || 1;
  const itemsPerPage = users?.pagination?.itemsPerPage || 10;

  const { mutate: deleteUser, isPending: deleting } = useDeleteUser();
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId, {
      onSuccess: () => {
        toast.success('User deleted successfully.');
        setOpenDeleteModal(false);
        router.refresh();
      },
      onError: (err) => {
        toast.error("Failed to delete user.", {
          description: err?.message,
        });
      },
    });
  };

  return (
    <div>
      <Table>
        <TableCaption>Manage users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.users?.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">
                {(index + 1) + (currentPage - 1) * itemsPerPage}
              </TableCell>
              <TableCell>
                <Avatar>
                  <AvatarFallback>{user?.username?.substring(0,2).toUpperCase()}</AvatarFallback>
                  <AvatarImage src={user?.avatar} alt={user?.username} />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{user?.username}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>
                {user?.roles.map((role, roleIndex) => (
                  <Badge key={roleIndex} variant="secondary" className="mr-1 rounded-2xl">
                    {role}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                {user?.verified ? (
                  <LucideCheckCircle className="text-green-500" />
                ) : (
                  <LucideXCircle className="text-red-500" />
                )}
              </TableCell>
              <TableCell className="flex flex-row-reverse gap-0.5">
                <DynamicModal
                  trigger={
                    <Button variant="ghost" size="icon" className="rounded-xl">
                      <LucideTrash className="text-red-500" />
                    </Button>
                  }
                  setOpen={setOpenDeleteModal}
                >
                  <div className="flex flex-col gap-y-2">
                    <h2 className="text-lg font-semibold text-muted-foreground">
                      Are you sure you want to delete &quot;{user?.username}&quot;? This cannot be undone.
                    </h2>
                    <div className="flex w-full items-center gap-4 justify-end">
                      <DialogClose asChild>
                        <Button className="rounded-xl">No</Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        className="rounded-xl"
                        disabled={deleting}
                        onClick={() => handleDeleteUser(user?._id)}
                      >
                        {deleting ? 'Deleting...' : 'Yes'}
                      </Button>
                    </div>
                  </div>
                </DynamicModal>
                <Button variant="ghost" size="icon" className="rounded-xl" asChild>
                  <Link href={`/dashboard/users/${user._id}/edit`}>
                    <LucideEdit />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl" asChild>
                  <Link href={`/users/${user._id}`}>
                    <LucideEye />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} className="text-right">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export const UserTableSkeleton = () => {
  return (
    <div>
      <Table>
        <TableCaption>Manage users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 20 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                <Skeleton className="w-32 h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-16 h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-16 h-6" />
              </TableCell>
              <TableCell className="flex items-center gap-0.5">
                <Skeleton className="w-6 h-6 rounded-xl" />
                <Skeleton className="w-6 h-6 rounded-xl" />
                <Skeleton className="w-6 h-6 rounded-xl" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;