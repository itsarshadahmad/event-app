import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const eventTags = [
    "Workshop",
    "Seminar",
    "Conference",
    "Meetup",
    "Bootcamp",
    "Other",
];

export default function UpdateEvent() {
    const { id } = useParams();
    const [tag, setTag] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [dateTime, setDateTime] = useState(dayjs());
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [venue, setVenue] = useState("");
    const [image, setImage] = useState(null);
    const [capacity, setCapacity] = useState("");
    const [duration, setDuration] = useState("");
    const [imageAcknowledgement, setImageAcknowledgement] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/event/public/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((res) => {
                    const event = res.data;
                    if (event) {
                        setTitle(event.title);
                        setDescription(event.description);
                        setVenue(event.venue);
                        setDateTime(dayjs(event.dateTime));
                        setCategory(event.category);
                        setTag(event.tag);
                        setCapacity(event.capacity);
                        setDuration(event.duration);
                        setCategory(event.categories);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    const handleSubmit = async () => {
        "/update/:id";
        await axios.post(
            `${import.meta.env.VITE_API_URL}/event/update/${id}`,
            {
                title,
                description,
                venue,
                dateTime,
                category,
                tag,
                categories,
                capacity,
                duration,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        navigate("/dashboard");
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    useEffect(() => {
        if (image) {
            setImageAcknowledgement(true);
        }
    }, [image]);

    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                mt: 3,
            }}
        >
            <FormControl
                sx={{
                    width: {
                        xs: "90vw",
                        sm: "20rem",
                        md: "25rem",
                    },
                }}
            >
                <Typography
                    variant="h1"
                    sx={{ fontSize: "2rem", mt: 1, mb: 4, mx: "auto" }}
                >
                    Create New Event
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    sx={{ mb: 1 }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {/* <TextField
                    id="outlined-basic"
                    label="Hosted By"
                    variant="outlined"
                    sx={{ mb: 1 }}
                    value={hostedBy}
                    onChange={(e) => setHostedBy(e.target.value)}
                /> */}

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
                {/* TODO: Multiple items to add */}
                <TextField
                    id="outlined-basic"
                    label="Categories"
                    variant="outlined"
                    value={category}
                    onChange={handleCategoryChange}
                    sx={{ mb: 1 }}
                />
                <TextField
                    id="outlined-basic"
                    label="Venue"
                    variant="outlined"
                    sx={{ mb: 1 }}
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Date And Time"
                        sx={{ mb: 1 }}
                        value={dateTime}
                        onChange={(v) => setDateTime(v)}
                    />
                </LocalizationProvider>
                <TextField
                    id="outlined-basic"
                    label="Capacity"
                    variant="outlined"
                    sx={{ mb: 1 }}
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Duration"
                    variant="outlined"
                    sx={{ mb: 1 }}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <FormControl fullWidth sx={{ mb: 1 }}>
                    <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={tag}
                        label="Tag"
                        onChange={(e) => setTag(e.target.value)}
                    >
                        {eventTags.map((tag, index) => (
                            <MenuItem key={index} value={tag}>
                                {tag}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="outlined"
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    startIcon={
                        imageAcknowledgement ? (
                            <DownloadDoneIcon />
                        ) : (
                            <CloudUploadIcon />
                        )
                    }
                    sx={{
                        mb: 1,
                        color: imageAcknowledgement && "green",
                        backgroundColor: imageAcknowledgement && "green",
                        borderColor: imageAcknowledgement && "green",
                    }}
                    value={image}
                    onChange={(e) => setImage(e.target.files[0])}
                >
                    Upload Cover Image
                    <VisuallyHiddenInput type="file" />
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={handleSubmit}
                    sx={{
                        color: "secondary.main",
                        fontSize: "1rem",
                        borderColor: "secondary.main",
                        ":hover": {
                            borderColor: "secondary.main",
                        },
                    }}
                >
                    Update
                </Button>
            </FormControl>
        </Container>
    );
}
