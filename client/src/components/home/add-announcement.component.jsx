import {
    Button,
    Container,
    FormControl,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddAnnouncement() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(
            `${import.meta.env.VITE_API_URL}/event/announcement/new`,
            {
                title,
                description,
                eventId: id,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        navigate("/dashboard");
    };

    return (
        <Container
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 4,
            }}
        >
            <FormControl
                sx={{
                    width: {
                        xs: "90vw",
                        sm: "30rem",
                    },
                }}
            >
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ mb: 2, textAlign: "center" }}
                >
                    Announcement
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    sx={{ mb: 1 }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    multiline
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    sx={{ mb: 1 }}
                    minRows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                    variant="outlined"
                    sx={{
                        color: "secondary.main",
                        fontSize: "1rem",
                        borderColor: "secondary.main",
                        ":hover": {
                            borderColor: "secondary.main",
                        },
                    }}
                    onClick={handleSubmit}
                >
                    Add
                </Button>
            </FormControl>
        </Container>
    );
}
