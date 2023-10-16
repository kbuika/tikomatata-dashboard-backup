/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import CustomButton from "../ui/custom-button"
import CreateTicket from "./create-ticket"
import EventTicketCard from "../ticket-card"
import VerticalEventNavBar from "@/src/layouts/horizontal-event-navbar"
import { fetchEventTicketsFn } from "@/src/api-calls"
import { TicketDataType } from "@/src/types"
import { errorToast } from "@/src/lib/utils"
import { useParams } from "react-router-dom"
import EventPagesWrapper from "@/src/layouts/wrappers/event-pages-wrapper"
import { Plus } from "lucide-react"
import { useTicketsStore } from "@/src/stores/tickets-store"
import { Sheet, SheetContent } from "../ui/sheet"
import { useEventsStore } from "@/src/stores/events-store"
import { StatusOnlineIcon } from "@heroicons/react/outline";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";

const data = [
  {
    name: "Viola Amherd",
    Role: "Federal Councillor",
    departement: "The Federal Department of Defence, Civil Protection and Sport (DDPS)",
    status: "failed",
  },
  {
    name: "Simonetta Sommaruga",
    Role: "Federal Councillor",
    departement:
      "The Federal Department of the Environment, Transport, Energy and Communications (DETEC)",
    status: "success",
  },
  {
    name: "Alain Berset",
    Role: "Federal Councillor",
    departement: "The Federal Department of Home Affairs (FDHA)",
    status: "success",
  },
  {
    name: "Ignazio Cassis",
    Role: "Federal Councillor",
    departement: "The Federal Department of Foreign Affairs (FDFA)",
    status: "failed",
  },
  {
    name: "Ueli Maurer",
    Role: "Federal Councillor",
    departement: "The Federal Department of Finance (FDF)",
    status: "success",
  },
  {
    name: "Guy Parmelin",
    Role: "Federal Councillor",
    departement: "The Federal Department of Economic Affairs, Education and Research (EAER)",
    status: "success",
  },
  {
    name: "Karin Keller-Sutter",
    Role: "Federal Councillor",
    departement: "The Federal Department of Justice and Police (FDJP)",
    status: "failed",
  },
];

const EventSupport = () => {
  const selectedEvent = useEventsStore((state) => state.selectedEvent)

  return (
    <EventPagesWrapper
    >
      <div className="border h-auto rounded-md p-4">
      

  <Card>
    <Title>{selectedEvent?.name} Support</Title>
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Resend Ticket</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Text>{item.Role}</Text>
            </TableCell>
            <TableCell>
              <Badge color={item?.status === "success" ? "emerald": "red"} icon={StatusOnlineIcon}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
                <div className="flex flex-row">
                <CustomButton
                    className="bg-mainPrimary text-white w-[6em]"
                    onClick={() => console.log("clicked")}
                >
                    Message
                </CustomButton>
                <CustomButton
                    className="bg-mainPrimary text-white ml-2 w-[6em]"
                    onClick={() => console.log("clicked")}
                >
                    Email
                </CustomButton>
                </div>
                
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
      </div>
    </EventPagesWrapper>
  )
}

export default EventSupport
