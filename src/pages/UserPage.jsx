import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { user_base_url } from "../api/base_url";
import { Button, Card, CardMedia, Container, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CodeIcon from "@mui/icons-material/Code";
import ShareIcon from "@mui/icons-material/Share";
import PeopleIcon from "@mui/icons-material/People";
import axiosInstance from "../api/axiosInstance";

const UserPage = () => {
  const { username } = useParams();
  //   console.log(id, username);
  const [userData, setUserData] = useState();
  const [repoData, setRepoData] = useState();

  const getUserData = () => {
    const url = user_base_url + username;
    const repoUrl = user_base_url + username + "/repos";
    axiosInstance
      .get(url)
      .then((res) => {
        // console.log(res);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));

    axiosInstance
      .get(repoUrl)
      .then((res) => {
        // console.log(res);
        setRepoData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserData();
  }, []);

  //   console.log(userData);
  //   console.log(repoData);

  return (
    <div className="md:grid md:grid-cols-8 text-center md:px-10 gap-5">
      <div className="md:col-span-2">
        <Typography
          className=" text-gray-500 !my-5 uppercase"
          variant="h5"
          component="h5"
        >
          {userData?.name}
        </Typography>
        <Card className="flex flex-col gap-3" variant="outlined">
          <CardMedia
            sx={{ height: 300 }}
            image={userData?.avatar_url}
            title="userImage"
          />
          <Typography className="text-blue-500" variant="body2" component="p">
            @{userData?.login}
          </Typography>
          <Typography className="text-gray-600" variant="body1" component="h4">
            {userData?.bio}
          </Typography>
          <Typography
            className="!mb-2"
            color="error"
            variant="body1"
            component="h4"
          >
            <PeopleIcon className="mr-1" />
            {userData?.followers} followers
            <span className="ml-4 text-green-800">
              {userData?.following} following
            </span>
          </Typography>
        </Card>
      </div>
      <div className="md:col-span-6">
        <Typography
          className=" text-gray-500 !my-5"
          variant="h5"
          component="h5"
        >
          Repository
        </Typography>
        <Container>
          <Card
            className="flex flex-col items-center gap-11 py-10"
            variant="outlined"
          >
            {repoData?.map((repo) => (
              <Card
                key={repo.id}
                className=" w-2xl !bg-gray-200 p-10"
                variant="outlined"
              >
                <a href={repo?.html_url} target="_blank">
                  <Typography
                    className=" text-blue-700"
                    variant="h6"
                    component="h6"
                  >
                    {repo?.name}
                  </Typography>
                </a>
                <Typography className=" text-gray-600 text-wrap">
                  {repo?.description}
                </Typography>
                <div className="w-full flex justify-center p-5 gap-2">
                  <Button
                    className="flex items-center gap-1"
                    variant="contained"
                    size="small"
                  >
                    <CodeIcon />
                    {repo?.language}
                  </Button>
                  <Button
                    className="flex items-center gap-1"
                    variant="contained"
                    color="warning"
                    size="small"
                  >
                    <ShareIcon />
                    {repo?.forks} forks
                  </Button>
                  <Button
                    className="flex items-center gap-1"
                    variant="contained"
                    color="success"
                    size="small"
                  >
                    <StarBorderIcon /> {repo?.stargazers_count} stars
                  </Button>
                </div>
              </Card>
            ))}
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default UserPage;
