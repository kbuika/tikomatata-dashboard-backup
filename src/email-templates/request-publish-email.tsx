import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  // Img,
  Preview,
  Text,
} from "@react-email/components"
import * as React from "react"
import { EventDataType } from "../types"

interface RequestPublishEmailProps {
  event: EventDataType | null
  user: any
}

export const RequestPublishEmail = ({
  event,
  user = { name: "Someone", email: "someone@something.com" },
}: RequestPublishEmailProps) => (
  <Html>
    <Head />
    <Preview>Request to publish event</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* <Img
          src={`${baseUrl}/static/koala-logo.png`}
          width="170"
          height="50"
          alt="Koala"
          style={logo}
        /> */}
        <Text style={paragraph}>Hi Tikomatata,</Text>
        <Text style={paragraph}>An event organizer wishes to publish their event</Text>
        <ul>
          <li>
            <Text>Event Name: {event?.name}</Text>
          </li>
          <li>
            <Text>Event ID: {event?.eventId}</Text>
          </li>
        </ul>
        <Text>
          Request made by: {user?.name} - {user?.email}
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          The Tikomatata Ghosts
        </Text>
        <Hr style={hr} />
        <Text style={footer}>somewhere in Kiambu, Kenya</Text>
      </Container>
    </Body>
  </Html>
)

export default RequestPublishEmail

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    // eslint-disable-next-line quotes
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
}

// const logo = {
//   margin: "0 auto",
// };

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
}

// const button = {
//   backgroundColor: "#5F51E8",
//   borderRadius: "3px",
//   color: "#fff",
//   fontSize: "16px",
//   textDecoration: "none",
//   textAlign: "center" as const,
//   display: "block",
// };

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
}
