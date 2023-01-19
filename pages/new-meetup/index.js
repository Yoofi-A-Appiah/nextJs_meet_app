//our-domain.com/new-meetup
import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
function NewMeetupPage() {
  const router = useRouter()
  async function addMeetupHandler(enterdMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enterdMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.replace("/")
  }
  return <><Head>
  <title>Add New Meetups</title>       <meta name='description' content='Add a new meetup to get news around'></meta>
</Head><NewMeetupForm onAddMeetup={addMeetupHandler} /> </>;
}
export default NewMeetupPage;
