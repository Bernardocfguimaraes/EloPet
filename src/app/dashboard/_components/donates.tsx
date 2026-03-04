"use client"
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Donation } from '@/generated/prisma';
import { formatCurrency, formatDate } from '@/utils/format';
import { useQuery } from '@tanstack/react-query';

interface ResponseData{
  data: Donation[]
}

export function DonationTable() {

  const { data, isLoading } = useQuery({
    queryKey: ['get-donates'],
    queryFn: async() => {
      const url = `${process.env.NEXT_PUBLIC_HOST_URL}/api/donates`
      const response = await fetch(url)
      const json = await response.json() as ResponseData;
      
      if(!response.ok){
        return[];
      }
      return json.data;
    },
    refetchInterval: 60000
  })

  if(isLoading){
    return(
      <div className='mt-8 flex flex-col items-center justify-center space-y-3'>
        <div className="w-6 h-6 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
        <p className='text-sm text-slate-400 font-medium animate-pulse'>Carregando doações...</p>
      </div>
    )
  }

  // Se não houver doações (Estado Vazio)
  if(!data || data.length === 0){
     return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <p className="text-sm font-medium text-slate-500">Nenhuma doação recebida ainda.</p>
        </div>
     )
  }

  return (
    <>
      <div className="hidden lg:block rounded-2xl border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-b-slate-100">
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest h-12">Doador</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Mensagem</TableHead>
              <TableHead className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">Valor</TableHead>
              <TableHead className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((donation) => (
              <TableRow key={donation.id} className="hover:bg-slate-50/50 transition-colors border-b-slate-100">
                <TableCell className="font-semibold text-slate-700">{donation.donorName}</TableCell>
                <TableCell className="max-w-72 text-slate-500 text-sm">{donation.donorMessage}</TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center justify-center bg-teal-50 text-teal-700 border border-teal-100/50 px-2.5 py-1 rounded-md font-bold text-xs">
                    {formatCurrency(donation.amount / 100)}
                  </span>
                </TableCell>
                <TableCell className="text-center text-slate-400 text-xs font-medium">
                  {formatDate(donation.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="lg:hidden space-y-4">
        {data.map((donation) => (
          <Card key={donation.id} className="rounded-xl border-slate-200/60 shadow-sm bg-white">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b border-slate-50">
              <CardTitle className="text-base font-bold text-slate-800">{donation.donorName}</CardTitle>
              <span className="inline-flex items-center justify-center bg-teal-50 text-teal-700 px-2 py-1 rounded-md font-bold text-xs">
                 {formatCurrency(donation.amount / 100)}
              </span>
            </CardHeader>
            <CardContent className="p-4 pt-3">
              <p className="text-sm text-slate-500 mb-3">{donation.donorMessage}</p>
              <div className="flex justify-end items-center">
                <span className="text-xs text-slate-400 font-medium">
                  {formatDate(donation.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}