import {
    Container,
    Typography,
    Box,
    Button,
    Stack,
    Chip,
    Paper,
} from "@mui/material";
import KeySpeaker from "./key-speaker.component";
import Announcements from "./announcements.component";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Error from "../partials/error.component";

export default function Event() {
    const { id } = useParams("id");
    const [event, setEvent] = useState(null);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/event/public/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setEvent(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    if (!event) return <Error message="Event not found." />;

    return (
        <Container
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <Typography variant={"h1"} sx={{ fontSize: "3rem", my: 3 }}>
                {event.title}
            </Typography>

            <Box sx={{ display: "flex", mb: 1 }}>
                <Typography sx={{ fontWeight: 700, mr: 1, fontSize: "1.2rem" }}>
                    Hosted By:
                </Typography>
                <Typography sx={{ fontSize: "1.2rem" }}>Daniel J.</Typography>
            </Box>

            <Box sx={{ display: "flex" }}>
                <Box
                    component="img"
                    src="/src/assets/event.svg"
                    sx={{ borderRadius: "10px" }}
                />
            </Box>

            <Box sx={{ display: "flex", my: 3 }}>
                <Stack direction="row" spacing={1}>
                    <Chip label={event.tag} color="primary" />
                    {event.categories.map((item, index) => (
                        <>
                            <Chip key={index} label={item} color="secondary" />
                        </>
                    ))}
                </Stack>
            </Box>
            <Box>
                <Typography
                    className="w-10/12"
                    variant={"p"}
                    sx={{
                        fontSize: "20px",
                    }}
                >
                    {event.description}
                </Typography>
            </Box>

            <Typography
                sx={{
                    display: "flex",
                    fontSize: "2rem",
                    fontWeight: 700,
                    mt: 5,
                }}
                variant="h3"
            >
                Details
            </Typography>
            <Paper
                sx={{
                    mx: 1,
                    my: 4,
                    p: 3,
                    display: "flex",
                    width: "90%",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
                elevation={6}
            >
                <Box sx={{ display: "flex", m: 1 }}>
                    <Typography
                        sx={{ fontWeight: 700, mr: 1, fontSize: "1.2rem" }}
                    >
                        Venue:
                    </Typography>
                    <Typography sx={{ fontSize: "1.2rem" }}>
                        {event.venue}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", m: 1 }}>
                    <Typography
                        sx={{ fontWeight: 700, mr: 1, fontSize: "1.2rem" }}
                    >
                        Date:
                    </Typography>
                    <Typography sx={{ fontSize: "1.2rem" }}>
                        31-08-2024
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", m: 1 }}>
                    <Typography
                        sx={{ fontWeight: 700, mr: 1, fontSize: "1.2rem" }}
                    >
                        Time:
                    </Typography>
                    <Typography sx={{ fontSize: "1.2rem" }}>10 am</Typography>
                </Box>

                <Box sx={{ display: "flex", m: 1 }}>
                    <Typography
                        sx={{ fontWeight: 700, mr: 1, fontSize: "1.2rem" }}
                    >
                        Seats Left:
                    </Typography>
                    <Typography sx={{ fontSize: "1.2rem" }}>
                        {event.capacity - event.attendees.length}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", m: 1 }}>
                    <Typography
                        sx={{ fontWeight: 700, mr: 1, fontSize: "1.2rem" }}
                    >
                        Capacity:
                    </Typography>
                    <Typography sx={{ fontSize: "1.2rem" }}>
                        {event.capacity}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", m: 1 }}>
                    <Typography
                        sx={{ fontWeight: 700, mr: 1, fontSize: "1.2rem" }}
                    >
                        Duration:
                    </Typography>
                    <Typography sx={{ fontSize: "1.2rem" }}>
                        {event.duration}
                    </Typography>
                </Box>
            </Paper>

            {event.KeySpeaker.length > 0 && (
                <>
                    <Typography
                        variant="h1"
                        sx={{ fontSize: "3rem", mt: 1, mb: 4 }}
                    >
                        Key Speaker
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            m: 1,
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        {event.KeySpeaker.map((item, index) => (
                            <Paper
                                sx={{ m: 2, py: 3 }}
                                elevation={5}
                                key={index}
                            >
                                <KeySpeaker
                                    key={index}
                                    name={item.name}
                                    bio={item.bio}
                                    topic={item.topic}
                                />
                            </Paper>
                        ))}
                    </Box>
                </>
            )}

            {event.announcement.length > 0 && (
                <Paper sx={{ p: 2 }} elevation={4}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: {
                                xs: "2rem",
                                sm: "3rem",
                            },
                            textAlign: "center",
                        }}
                    >
                        Announcements
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: 2,
                        }}
                    >
                        {event.announcement.map((item, index) => (
                            <Announcements
                                key={index}
                                title={item.title}
                                description={item.description}
                                date={item.date}
                            />
                        ))}
                    </Box>
                </Paper>
            )}

            <Box
                sx={{ display: "flex", m: 1, mt: 3, justifyContent: "center" }}
            >
                <Button
                    variant={"outlined"}
                    sx={{
                        color: "secondary.main",
                        fontSize: "1rem",
                        borderColor: "secondary.main",
                        ":hover": {
                            borderColor: "secondary.main",
                        },
                    }}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
}
