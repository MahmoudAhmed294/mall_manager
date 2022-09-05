import React from "react";
import Routes from "./routes";
import { SnackbarProvider } from "notistack";
import Slide, { SlideProps } from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import { closeSnackbar } from "redux/snackbarSlice";
import { useAppDispatch } from "app/hooks";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}
function App() {
  const notistackRef = React.useRef(null);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  React.useEffect(() => {
    setTimeout(() => {
      alert(`
      user : mall
      password:123
      `);
    }, 2000);
  }, []);
  return (
    <>
      <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={5000}
        maxSnack={5}
        preventDuplicate
        dense
        TransitionComponent={SlideTransition}
        onClose={() => dispatch(closeSnackbar())}
        ref={notistackRef}
        action={(key) => (
          <IconButton
            style={{
              color: "#fff",
              opacity: "0.7",
              fontSize: "16px",
              padding: "10px",
            }}
            onClick={onClickDismiss(key)}
          >
            {/* <CloseIcon /> */}
          </IconButton>
        )}
      >
        <TransitionGroup>
          <CSSTransition timeout={300} classNames="fade" key={location.key}>
            <Routes />
          </CSSTransition>
        </TransitionGroup>
      </SnackbarProvider>
    </>
  );
}

export default App;
