import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmed, setConfirmed] = useState(false)
  const [addBreakfast, setaddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmed(booking?.isPaid ?? false)
  }, [booking]);

  console.log(addBreakfast, confirmed);
  const moveBack = useMoveBack();



  if (isLoading || isLoadingSettings) return <Spinner />

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfast = settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmed) return;
    if (addBreakfast) {

    } else {
      checkin({
        bookingId, breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        }
      })
    }

    checkin({ bookingId, breakfast: {} });

  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} addBreakfast={addBreakfast} confirmed={confirmed}/>

      {!hasBreakfast && <Box>
        <CheckBox
          checked={addBreakfast}
          onChange={() => {
            setaddBreakfast((breakfast) => !breakfast);
            setConfirmed(false)
          }}
          id="breakfast">
          Want to add breakfast for {formatCurrency(optionalBreakfast)}
        </CheckBox>
      </Box>}

      <Box>
        <CheckBox
          checked={confirmed}
          onChange={() => setConfirmed((confirm) => !confirm)}
          id='confirm'
          disabled={confirmed || isCheckingIn}>
          I confirm that {guests.fullName} has paid the total amount of {""}
          {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfast)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfast)})`}
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button
          disabled={!confirmed || isCheckingIn}
          onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
