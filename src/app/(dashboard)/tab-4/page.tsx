"use client";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {
  Button,
  Datepicker,
  Dropdown,
  Eventcalendar,
  Input,
  MbscCalendarEvent,
  MbscDatepickerChangeEvent,
  MbscDatepickerControl,
  MbscDateType,
  MbscEventcalendarView,
  MbscEventClickEvent,
  MbscEventCreatedEvent,
  MbscEventDeletedEvent,
  MbscPopupButton,
  Popup,
  setOptions,
  Snackbar,
} from "@mobiscroll/react";
import {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

setOptions({
  theme: "windows",
  themeVariant: "light",
});

interface TripEvent extends MbscCalendarEvent {
  fromId: string;
  toId: string;
  driverId: string;
  conductorId: string;
  vehicleId: string;
}

// const defaultEvents: TripEvent[] = [
//   {
//     id: '1',
//     start: '2024-08-30T13:00',
//     end: '2024-08-30T15:00',
//     fromId: "123",
//     toId: '456',
//     driverId: '20',
//     conductorId: '25',
//     vehicleId: '3',
//     resource: '3', // Add this line to associate the event with the vehicle
//   },
// ];

const viewSettings: MbscEventcalendarView = {
  timeline: { type: "day" },
};

const responsivePopup = {
  medium: {
    display: "anchored",
    width: 400,
    fullScreen: false,
    touchUi: false,
  },
};

const App: FC = () => {
  const [defaultEvents, setDefaultEvents] = useState<TripEvent[]>([]);
  const [tempEvent, setTempEvent] = useState<TripEvent>();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLElement>();
  const [start, startRef] = useState<Input | null>(null);
  const [end, endRef] = useState<Input | null>(null);
  const [popupEventFromId, setFromId] = useState<string>("");
  const [popupEventToId, setToId] = useState<string>("");
  const [popupEventDriverId, setDriverId] = useState<string>("");
  const [popupEventConductorId, setConductorId] = useState<string>("");
  const [popupEventVehicleId, setVehicleId] = useState<string>("");
  const [popupEventDate, setDate] = useState<MbscDateType[]>([]);
  const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const calInst = useRef<Eventcalendar>(null);

  const [locations, setLocations] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [conductors, setConductors] = useState([]);

  const getLocations = async () => {
    const response = await fetch("/api/locations");
    const data = await response.json();
    setLocations(data.locations);
    setDrivers(data.drivers);
    setBuses(data.buses);
    setConductors(data.conductors);
    setMyEvents(
      data.trips.map((trip: any) => ({
        id: trip.id,
        start: trip.startAt,
        end: trip.endAt,
        fromId: trip.fromId,
        toId: trip.toId,
        driverId: trip.driverId,
        conductorId: trip.conductorId,
        vehicleId: trip.vehicleId,
        resource: trip.vehicleId,
      }))
    );
  };
  const [myEvents, setMyEvents] = useState<TripEvent[]>();

  // Assume these are fetched from the backend
  useEffect(() => {
    getLocations();
  }, []);
  const handleCreateTrip = async (newEvent: TripEvent) => {
    const response = await fetch("/api/create-trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    const data = await response.json();
    if (data.status === 500) {
      setSnackbarOpen(true);
      toast.error("Something went wrong");
    } else {
      toast.success("Trip created successfully");
      setSnackbarOpen(false);
      // setMyEvents([...myEvents, data.trip]);
    }
  };
  const saveEvent = useCallback(() => {
    const newEvent: TripEvent = {
      // id: tempEvent!.id,
      startAt: popupEventDate[0],
      endAt: popupEventDate[1],
      fromId: popupEventFromId,
      toId: popupEventToId,
      driverId: popupEventDriverId,
      conductorId: popupEventConductorId,
      vehicleId: popupEventVehicleId,
      // resource: popupEventVehicleId, // Add this line to associate the event with the vehicle
    };
    if (isEdit) {
      const index = myEvents?.findIndex((x) => x.id === tempEvent!.id);
      const newEventList = [...myEvents!];
      newEventList.splice(index!, 1, newEvent);
      setMyEvents(newEventList);
    } else {
      handleCreateTrip(newEvent);
    }
    calInst.current?.navigateToEvent(newEvent);
    setOpen(false);
  }, [
    isEdit,
    myEvents,
    popupEventDate,
    popupEventFromId,
    popupEventToId,
    popupEventDriverId,
    popupEventConductorId,
    popupEventVehicleId,
    tempEvent,
  ]);

  const deleteEvent = useCallback(
    (event: TripEvent) => {
      setMyEvents(myEvents?.filter((item) => item.id !== event.id));
      setTempEvent(event);
      setSnackbarOpen(true);
    },
    [myEvents]
  );

  const loadPopupForm = useCallback((event: TripEvent) => {
    setFromId(event.fromId);
    setToId(event.toId);
    setDriverId(event.driverId);
    setConductorId(event.conductorId);
    setVehicleId(event.vehicleId || "");
    setDate([event.start!, event.end!]);
  }, []);

  const dateChange = useCallback((args: MbscDatepickerChangeEvent) => {
    setDate(args.value as MbscDateType[]);
  }, []);

  const onDeleteClick = useCallback(() => {
    deleteEvent(tempEvent!);
    setOpen(false);
  }, [deleteEvent, tempEvent]);

  const handleEventClick = useCallback(
    (args: MbscEventClickEvent) => {
      setEdit(true);
      setTempEvent(args.event as TripEvent);
      loadPopupForm(args.event as TripEvent);
      setAnchor(args.domEvent.target);
      setOpen(true);
    },
    [loadPopupForm]
  );

  const handleEventCreated = useCallback(
    (args: MbscEventCreatedEvent) => {
      setEdit(false);
      const newEvent = {
        ...args.event,
        vehicleId: args.event.resource, // Set vehicleId based on the resource where the event was created
        resource: args.event.resource, // Ensure resource is set
      } as TripEvent;
      setTempEvent(newEvent);
      loadPopupForm(newEvent);
      setAnchor(args.target);
      setOpen(true);
    },
    [loadPopupForm]
  );

  const handleEventDeleted = useCallback(
    (args: MbscEventDeletedEvent) => {
      deleteEvent(args.event as TripEvent);
    },
    [deleteEvent]
  );

  const handleEventUpdated = useCallback(
    (args: { event: MbscCalendarEvent }) => {
      const updatedEvent = args.event as TripEvent;
      updatedEvent.vehicleId = updatedEvent.resource as string;
      setMyEvents((prevEvents) =>
        prevEvents?.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
      );
    },
    []
  );

  const controls = useMemo<MbscDatepickerControl[]>(() => ["datetime"], []);
  const headerText = useMemo<string>(
    () => (isEdit ? "Edit Trip" : "New Trip"),
    [isEdit]
  );
  const popupButtons = useMemo<(string | MbscPopupButton)[]>(() => {
    if (isEdit) {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Save",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    } else {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Add",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    }
  }, [isEdit, saveEvent]);

  const onPopupClose = useCallback(() => {
    if (!isEdit) {
      setMyEvents([...myEvents!]);
    }
    setOpen(false);
  }, [isEdit, myEvents]);

  const handleSnackbarClose = useCallback(() => setSnackbarOpen(false), []);

  return (
    <div>
      <Eventcalendar
        clickToCreate={true}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        data={myEvents}
        view={viewSettings}
        ref={calInst}
        resources={buses}
        onEventClick={handleEventClick}
        onEventCreated={handleEventCreated}
        onEventDeleted={handleEventDeleted}
        onEventUpdated={handleEventUpdated}
      />
      <Popup
        display="bottom"
        fullScreen={true}
        contentPadding={false}
        headerText={"hello"}
        anchor={anchor}
        buttons={popupButtons}
        isOpen={isOpen}
        onClose={onPopupClose}
        responsive={responsivePopup}
      >
        <div className="mbsc-form-group">
          <Dropdown
            label="From"
            value={popupEventFromId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setFromId(event.target.value)
            }
          >
            <option value="" selected disabled>
              Select
            </option>
            {locations.map((location:any) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </Dropdown>

          <Dropdown
            label="To"
            value={popupEventToId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setToId(event.target.value)
            }
          >
            <option value="" selected disabled>
              Select
            </option>
            {locations.map((location:any) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </Dropdown>
          <Dropdown
            label="Driver"
            value={popupEventDriverId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setDriverId(event.target.value)
            }
          >
            <option value="" selected disabled>
              Select
            </option>
            {drivers.map((driver:any) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </Dropdown>
          <Dropdown
            label="Conductor"
            value={popupEventConductorId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setConductorId(event.target.value)
            }
          >
            <option value="" selected disabled>
              Select
            </option>
            {conductors.map((conductor:any) => (
              <option key={conductor.id} value={conductor.id}>
                {conductor.name}
              </option>
            ))}
          </Dropdown>
          {/* <Dropdown
            label="Vehicle"
            value={popupEventVehicleId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => setVehicleId(event.target.value)}
          >
            {buses.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </option>
            ))}
          </Dropdown> */}
        </div>
        <div className="mbsc-form-group">
          <Input ref={startRef} label="Starts" />
          <Input ref={endRef} label="Ends" />
          <Datepicker
            select="range"
            controls={controls}
            touchUi={true}
            startInput={start}
            endInput={end}
            showRangeLabels={false}
            onChange={dateChange}
            value={popupEventDate}
          />
          {isEdit && (
            <div className="mbsc-button-group">
              <Button
                className="mbsc-button-block"
                color="danger"
                variant="outline"
                onClick={onDeleteClick}
              >
                Delete trip
              </Button>
            </div>
          )}
        </div>
      </Popup>
      <Snackbar
        message="Trip deleted"
        isOpen={isSnackbarOpen}
        onClose={handleSnackbarClose}
        button={{
          action: () => {
            setMyEvents([...myEvents!, tempEvent!]);
          },
          text: "Undo",
        }}
      />
    </div>
  );
};

export default App;
