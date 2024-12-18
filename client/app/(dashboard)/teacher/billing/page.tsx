"use client"

import Loading from "@/components/loading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatPrice } from "@/lib/utils"
import { useGetTransactionsQuery } from "@/state/api"
import { useUser } from "@clerk/nextjs"
import React, { useState } from "react"


const TeacherBilling = () => {
  const [paymentType, setPaymentType] = useState("all")
  const { user, isLoaded } = useUser()
  const { data: transactions, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery(user?.id || "", {
      skip: !isLoaded || !user,
    })

  const filteredData =
    transactions?.filter((transaction) => {
      const matchesTypes =
        paymentType === "all" || transaction.paymentProvider === paymentType
      return matchesTypes
    }) || []

  if (!isLoaded) return <Loading />
  if (!user) return <div>Please sign in to view your billing information.</div>

  return (
    <div className="space-y-8">
      <div className="space-y-6 rounded-lg bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Payment History
        </h2>
        <div className="flex space-x-4">
          <Select value={paymentType} onValueChange={setPaymentType}>
            <SelectTrigger className="w-[180px] border-none bg-background">
              <SelectValue placeholder="Payment Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="stripe">Stripe</SelectItem>
              <SelectItem value="paypal">Paypal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-[400px] w-full">
          {isLoadingTransactions ? (
            <Loading />
          ) : (
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="p-4">Date</TableHead>
                  <TableHead className="p-4">Amount</TableHead>
                  <TableHead className="p-4">Payment Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="min-h-[200px] bg-card">
                {filteredData.length > 0 ? (
                  filteredData.map((transaction) => (
                    <TableRow
                      key={transaction.transactionId}
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="p-4">
                        {new Date(transaction.dateTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="p-4 font-medium">
                        {formatPrice(transaction.amount)}
                      </TableCell>
                      <TableCell className="p-4">
                        {transaction.paymentProvider}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      className="p-4 text-center text-muted-foreground"
                      colSpan={3}
                    >
                      No transactions to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeacherBilling