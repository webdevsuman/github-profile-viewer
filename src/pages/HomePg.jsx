import React from "react";
import axios from "axios";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { base_url } from "../api/base_url";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

const HomePg = () => {
  const githubAccessToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
  // console.log(githubAccessToken);

  const [input, setInput] = useState({ searchField: "" });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  // console.log(input);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(input);

    await axios
      .get(base_url + input.searchField, {
        headers: {
          Authorization: `token ${githubAccessToken}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setData(res.data.items);
      })
      .catch((err) => console.log(err));
  };

  //-----GET DATA AFTER SEARCH----
  const [data, setData] = useState();

  // useEffect(() => {
  //   getData();
  // }, []);

  // console.log(data);

  return (
    <div className="flex flex-col items-center justify-center my-20">
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <div className="flex items-center">
          <TextField
            id="outlined-required"
            placeholder="Search by username"
            name="searchField"
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </div>
      </Box>
      <Container className="flex justify-center gap-10 my-10">
        {data?.map((user) => {
          return (
            <div key={user.id}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={user.avatar_url}
                  title="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    className="text-gray-400"
                    variant="h6"
                    component="div"
                  >
                    @{user.login}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-blue-900 !font-semibold"
                  >
                    Click View to go to the Profile
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/users/${user.id}/${user.login}`}>
                    <Button variant="contained" color="success" size="small">
                      View
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default HomePg;
