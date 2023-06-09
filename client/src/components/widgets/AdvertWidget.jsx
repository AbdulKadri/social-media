import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/styleHelpers/FlexBetween";
import WidgetWrapper from "components/styleHelpers/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme(); // get theme palette
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            {/* display advert info */}
            <FlexBetween>
                {/* display advert title */}
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                {/* display advert link */}
                <Typography color={medium} sx={{ cursor: "pointer" }}>Create Ad</Typography>
            </FlexBetween>

            {/* display advert image */}
            <img
                width="100%"
                height="auto"
                alt="advert"
                src={`${process.env.REACT_APP_API_URL}/assets/info4.jpeg`}
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />

            {/* display advert description */}
            <FlexBetween>
                <Typography color={main}>MikaCosmetics</Typography>
                <Typography color={medium}>mikacosmetics.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Your pathway to stunning and immaculate beauty and made sure your skin
                is exfoliating skin and shining like light.
            </Typography>
        </WidgetWrapper>
    );
};

export default AdvertWidget;