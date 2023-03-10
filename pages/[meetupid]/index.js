import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

import MeetupDetail from "../../components/meetups/MeetupDetail";
function MeetupDetails(props) {
  return (
    <>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta name="description" content={props.meetupData.description}></meta>
    </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </>
  );
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupid;
  // console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://yoofi_a:atomsgadget@cluster0.amaxj2t.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        title: selectedMeetup.title
      }
    },
  };
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://yoofi_a:atomsgadget@cluster0.amaxj2t.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map(meetup => ({params:{meetupid: meetup._id.toString()}}))
  };
}
export default MeetupDetails;
