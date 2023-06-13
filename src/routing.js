import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalLoader from "./components/globalComponents/GlobalLoader";
import { fetchUsersCurrentLocations } from "./api/mapApiCalls";
import { setCurrentUser } from "./redux/slices/authSlice";
import useSocketHelper from "./utils/hooks/useSocketHelper";
import { getCurrencyRate, setLanguage } from "./redux/slices/globalSlice";
import moment from "moment";
import { SETTING_URLS } from "./utils/constants";
const FullScreenGlobeContainer = lazy(() =>
  import("./pages/experimental/fullscreenGlobe/FullScreenGlobeContainer")
);
//Settings
const SettingsContainer = lazy(() =>
  import("./pages/settings/SettingsContainer")
);
const UserSettingsContainer = lazy(() =>
  import("./components/settingComponents/userSettings/UserSettingsContainer")
);
const ChatContainer = lazy(() =>
  import("./components/settingComponents/chatComponents/ChatContainer")
);
const MyListingsContainer = lazy(() =>
  import("./components/settingComponents/myListings/MyListingsContainer")
);
const BecomeAnAgentContainer = lazy(() =>
  import("./components/settingComponents/becomeAnAgent/BecomeAnAgentContainer")
);
const RegisterCompany = lazy(() =>
  import("./components/settingComponents/registerCompany/RegisterCompany")
);
const MyPropertiesContainer = lazy(() =>
  import(
    "./components/settingComponents/myListings/properties/MyPropertiesContainer"
  )
);
const AuctionsContainer = lazy(() =>
  import("./components/settingComponents/myListings/auctions/AuctionsContainer")
);
const SavedListingsContainer = lazy(() =>
  import("./components/settingComponents/savedListings/SavedListingsContainer")
);
const SavedProperties = lazy(() =>
  import("./components/settingComponents/savedListings/SavedProperties")
);
const SavedAgencies = lazy(() =>
  import("./components/settingComponents/savedListings/SavedAgencies")
);
const SavedAgents = lazy(() =>
  import("./components/settingComponents/savedListings/SavedAgents")
);

const Agencies = lazy(() => import("./pages/agency/Agencies"));
const VerifyUser = lazy(() => import("./pages/authentication/VerifyUser"));

const PropertiesContainer = lazy(() =>
  import("./pages/properties/PropertiesContainer")
);
const HeaderContainer = lazy(() =>
  import("./components/globalComponents/Header/HeaderContainer")
);
const AgentDetails = lazy(() => import("./pages/agents/AgentDetails"));
const Agents = lazy(() => import("./pages/agents/Agents"));
const AccountCreation = lazy(() =>
  import("./pages/authentication/AccountCreation")
);
const LoginPage = lazy(() => import("./pages/authentication/LoginPage"));
const SignUpPage = lazy(() => import("./pages/authentication/SignUpPage"));
const Comparison = lazy(() => import("./pages/propertyComparison/Comparison"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PartnerDetails = lazy(() => import("./pages/partners/PartnerDetails"));
const PartnersShowcase = lazy(() =>
  import("./pages/partners/PartnersShowcase")
);
const ProjectDetails = lazy(() => import("./pages/partners/ProjectDetails"));
const CreateProperty = lazy(() => import("./pages/properties/CreateProperty"));
const PropertyInformation = lazy(() =>
  import("./pages/properties/PropertyInformation")
);
const ResetPassword = lazy(() =>
  import("./pages/authentication/ResetPassword")
);
const AddNewAgentToCompany = lazy(() =>
  import("./pages/authentication/AddNewAgentToCompany")
);

const PrivateRoute = lazy(() => import("./utils/PrivateRoute"));
const Auctions = lazy(() => import("./pages/auction/Auctions"));

const AuctionDetail = lazy(() => import("./pages/auction/AuctionDetail"));
const Courses = lazy(() => import("./pages/courses/Courses"));
const CourseDetail = lazy(() => import("./pages/courses/CourseDetail"));
const CourseVideo = lazy(() => import("./pages/courses/CourseVideo"));
const ZSphereContainer = lazy(() => import("./pages/zSphere/ZSphereContainer"));
const MortgageContainer = lazy(() =>
  import("./pages/mortgage/MortgageContainer")
);
const TermsAndConditions = lazy(() =>
  import("./components/globalComponents/legal/TermsAndConditions")
);
const PrivacyPolicy = lazy(() =>
  import("./components/globalComponents/legal/PrivacyPolicy")
);
const MemberDetailContainer = lazy(() =>
  import("./components/zSpehere/members/memberDetail/MemberDetailContainer")
);

// const Trending = lazy(() => import("./pages/trending/Trending"));
const AboutUsContainer = lazy(() => import("./pages/aboutUs/AboutUsContainer"));
const StocksContainer = lazy(() =>
  import("./pages/experimental/propertyStocks/StocksContainer")
);
const QuizContainer = lazy(() =>
  import("./components/coursesComponents/videos/quiz/QuizContainer")
);

function Routing() {
  const dispatch = useDispatch();
  useSocketHelper();

  const { darkMode, currencyRates, langIndex } = useSelector(
    (state) => state.global
  );
  const { currentLocation, currentUser } = useSelector((state) => state.auth);

  let diffInDays = 0;
  let _currentDate = moment();

  const dateDiffInDays = (date1, date2) => {
    const momentDate1 = moment(date1);
    const momentDate2 = moment(date2);
    diffInDays = momentDate2.diff(momentDate1, "days");
    return diffInDays;
  };
  //console.log({ diffInDays, _currentDate });

  useEffect(() => {
    if (!currencyRates || diffInDays > 0) dispatch(getCurrencyRate());
    // eslint-disable-next-line
  }, [diffInDays, currencyRates]);
  useEffect(() => {
    if (!currentLocation) {
      setUserLocation();
    }
    const saved = window?.localStorage?.getItem("remember_me");
    const userData = JSON.parse(window?.localStorage?.getItem("currentUser"));
    // console.log({ userData, currentUser });
    if (saved && userData) {
      dispatch(
        setCurrentUser(JSON.parse(window?.localStorage?.getItem("currentUser")))
      );
    }
    dateDiffInDays(_currentDate, currencyRates?.date);

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const saved = window?.localStorage?.getItem("remember_me");
    if (saved && currentUser) {
      // console.log("setting...", { currentUser });
      window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    // eslint-disable-next-line
  }, [currentUser]);
  useEffect(() => {
    if (!langIndex) dispatch(setLanguage(0));

    // eslint-disable-next-line
  }, [langIndex]);
  useEffect(() => {
    if (darkMode) document.body.style.backgroundColor = "#212124";
    else document.body.style.backgroundColor = "white";
  }, [darkMode]);
  useEffect(() => {
    // console.log({ currentLocation });
  }, [currentLocation]);

  const setUserLocation = async () => {
    await fetchUsersCurrentLocations(dispatch);
  };

  return (
    <Suspense fallback={<GlobalLoader />}>
      <Routes>
        <Route element={<HeaderContainer />}>
          <Route path="*" element={<PropertiesContainer />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<PropertiesContainer />} />
          <Route path="/listing/:id" element={<PropertyInformation />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/:id" element={<AgentDetails />} />
          <Route path="/agencies" element={<Agencies />} />
          <Route path="/create-post" element={<CreateProperty />} />
          <Route path="/partners" element={<PartnersShowcase />} />
          <Route path="/partner/:id" element={<PartnerDetails />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/auction/:id" element={<AuctionDetail />} />
          <Route path="/about-us" element={<AboutUsContainer />} />
          <Route path="/investment" element={<MortgageContainer />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/zSphere" element={<ZSphereContainer />} />
          <Route path="/zSphere/:route" element={<ZSphereContainer />} />
          <Route path="/zSphere/:route/:id" element={<ZSphereContainer />} />
          <Route
            path="/zSphere/:route/:id/:eventId"
            element={<ZSphereContainer />}
          />
          <Route
            path="/zSphere/:route/:id/:eventId/:param4"
            element={<ZSphereContainer />}
          />
          <Route path="/zSphere/user/:id" element={<MemberDetailContainer />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/investment" element={<MortgageContainer />} />

          <Route
            path="/courses"
            element={
              <PrivateRoute>
                <Courses />
              </PrivateRoute>
            }
          />
          <Route
            path="/course/:courseId"
            element={
              <PrivateRoute>
                <CourseDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/course/:courseId/:moduleId"
            element={
              <PrivateRoute>
                <CourseVideo />
              </PrivateRoute>
            }
          />
          <Route
            path="/course/:courseId/:moduleId/quiz"
            element={
              <PrivateRoute>
                <QuizContainer />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/"
            element={
              <PrivateRoute>
                <SettingsContainer />
              </PrivateRoute>
            }
          >
            <Route
              path={SETTING_URLS?.PROFILE}
              element={<UserSettingsContainer />}
            />
            <Route path={SETTING_URLS?.CHAT} element={<ChatContainer />}>
              <Route path=":id" element={<ChatContainer />} />
            </Route>
            <Route
              path={SETTING_URLS?.MY_LISTINGS}
              element={<MyListingsContainer />}
            >
              <Route path="properties" element={<MyPropertiesContainer />}>
                <Route path="*" element={<MyPropertiesContainer />} />
              </Route>
              <Route path="my_files" element={<AuctionsContainer />}>
                <Route path="*" element={<AuctionsContainer />} />
              </Route>
            </Route>
            <Route
              path={SETTING_URLS?.BECOME_AN_AGENT}
              element={<BecomeAnAgentContainer />}
            />
            <Route
              path={SETTING_URLS?.REGISTER_AGENCY}
              element={<RegisterCompany />}
            />
            <Route
              path={SETTING_URLS?.SAVED_LISTINGS}
              element={<SavedListingsContainer />}
            >
              <Route path="properties" element={<SavedProperties />} />
              <Route path="agents" element={<SavedAgents />} />
              <Route path="agencies" element={<SavedAgencies />} />
            </Route>

            <Route path="*" element={<UserSettingsContainer />} />
          </Route>

          <Route
            path="/experimental/stocks"
            element={
              <PrivateRoute>
                <StocksContainer />
              </PrivateRoute>
            }
          />
          <Route
            path="/experimental/Globe"
            element={<FullScreenGlobeContainer />}
          />
        </Route>
        <Route path="/verify-user/:code" element={<VerifyUser />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/account-creation" element={<AccountCreation />} />
        <Route
          path="/reset-password/:code/:email"
          element={<ResetPassword />}
        />
        <Route
          path="/join-company/:companyId/:email"
          element={<AddNewAgentToCompany />}
        />

        <Route component={Error} />
      </Routes>
    </Suspense>
  );
}

export default Routing;
