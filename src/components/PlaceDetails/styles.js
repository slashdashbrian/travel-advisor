import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  chip: {
    margin: "5px 5px 5px 0",
  },
  subtitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  spacing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  starsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  cuisine: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
}));
