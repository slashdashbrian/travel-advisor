import React from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box>
          <Typography variant="subtitle1">Price</Typography>
          <Typography variant="body2" color="textSecondary">
            {place.price_level}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography variant="body2" color="textSecondary">
            {place.ranking}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Rating</Typography>
          <Box className={classes.starsContainer}>
            {" "}
            <Rating
              name="read-only"
              value={place.rating}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" color="textSecondary">
              {place.rating}/5 Stars
            </Typography>
            <Typography variant="body2" color="textSecondary">
              out of {place.num_reviews} Reviews
            </Typography>
          </Box>
        </Box>
        {place?.awards?.map((award, index) => {
          return (
            <Box
              my={1}
              display="flex"
              justifyContent="space-between"
              key={index}
            >
              <img src={award.images.small} alt={award.display_name} />
              <Typography variant="subtitle2" color="textSecondary">
                {award.display_name}
              </Typography>
            </Box>
          );
        })}

        {place?.cuisine &&
          place.cuisine.map(({ name }) => (
            <Chip
              key={name}
              size="small"
              label={name}
              className={classes.chip}
            />
          ))}

        {place?.address && (
          <Typography variant="body2" color="textSecondary" component="p">
            <LocationOnIcon /> {place.address}
          </Typography>
        )}
        {place?.address && (
          <Typography variant="body2" color="textSecondary" component="p">
            <PhoneIcon />
            {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            href={place.web_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            href={place.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
