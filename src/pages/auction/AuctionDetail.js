import React, { useMemo } from "react";
import TopInfo from "../../components/auctionComponents/detail/TopInfo";
import BidTable from "../../components/auctionComponents/detail/BidTable";
import TopLightbox from "../../components/auctionComponents/detail/TopLightbox";
import OtherAuctions from "../../components/auctionComponents/detail/OtherAuctions";
import {
  AUCTIONS_SOCKET_API_URL,
  BID_STATUS,
  SOCKET_BID_ACTION,
} from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import {
  setAuctionBids,
  setAuctionDetails,
} from "../../redux/slices/auctionSlice";

const AuctionDetail = () => {
  const dispatch = useDispatch();
  const { auctionDetail, auctionBids } = useSelector((state) => state.auction);

  // useEffect(() => {
  //   console.log({ auctionDetail });
  // }, [auctionDetail]);
  // useEffect(() => {
  //   console.log({ auctionBids });
  // }, [auctionBids]);
  const handleNewSocketMessage = (message) => {
    // console.log({ auctionDetail, auctionBids });
    handleBidActions(JSON.parse(message?.data));
  };

  const handleBidActions = (socket) => {
    // console.log({ socket });

    switch (socket?.action) {
      case SOCKET_BID_ACTION.update:
        handleBidUpdate(socket?.bid);
        break;
      case SOCKET_BID_ACTION.new:
        handleNewBid(socket?.bid);
        break;
      default:
        break;
    }
  };

  const handleBidUpdate = (bid) => {
    // console.log({ bid, auctionDetail });
    if (
      parseFloat(bid?.price) >
      parseFloat(auctionDetail?.result?.highest_bid?.price)
    ) {
      // console.log("highest should be updated");
      dispatch(
        setAuctionDetails({
          ...auctionDetail,
          result: { ...auctionDetail?.result, highest_bid: bid },
        })
      );
    }
    if (bid?.status === BID_STATUS.accepted) {
      // console.log("accepted...", { bid, auctionDetail });
      const available_files =
        auctionDetail?.result?.available_files - bid?.file_count;
      console.log({ available_files });
      dispatch(
        setAuctionDetails({
          ...auctionDetail,
          result: {
            ...auctionDetail?.result,
            available_files:
              auctionDetail?.result?.available_files - bid?.file_count,
            closing_bid: [...auctionDetail?.result?.closing_bid, bid],
          },
        })
      );
    }
    dispatch(
      setAuctionBids({
        ...auctionBids,
        result: {
          ...auctionBids?.result,
          results: auctionBids?.result?.results?.map((elem) => {
            if (elem?.id === bid?.id) {
              return bid;
            } else return elem;
          }),
        },
      })
    );
  };
  const handleNewBid = (bid) => {
    if (
      parseFloat(bid?.price) >
      parseFloat(auctionDetail?.result?.highest_bid?.price)
    ) {
      // console.log("highest should be updated");
      dispatch(
        setAuctionDetails({
          ...auctionDetail,
          result: { ...auctionDetail?.result, highest_bid: bid },
        })
      );
    }
    dispatch(
      setAuctionBids({
        ...auctionBids,
        result: {
          ...auctionBids?.result,
          results: [bid, ...auctionBids?.result?.results],
        },
      })
    );
  };

  useWebSocket(AUCTIONS_SOCKET_API_URL, {
    queryParams: {
      id: auctionDetail?.result?.id,
    },
    onOpen: () => {
      // console.log("connected to auctions...")
    },
    shouldReconnect: (closeEvent) => true,
    onMessage: handleNewSocketMessage,
  });

  const hasEnded = useMemo(() => {
    if (auctionDetail?.result?.available_files <= 0) return true;
    else return false;
  }, [auctionDetail]);

  return (
    <>
      <TopLightbox />
      <TopInfo />
      {!hasEnded && <BidTable />}

      <OtherAuctions />
    </>
  );
};

export default AuctionDetail;
