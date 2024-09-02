export default function Index() {
  return (
    <>
      <h3 className="text-xl">Welcome to the Pending UI demo</h3>
      <p className="mt-4">
        This example simulates the behavior of a messaging app/route. Click on
        the name of one of your feathered friends in the left sidebar to view
        your message history. Notice how the content of this box fades out while
        waiting for the new message history to load. Try toggling the pending UI
        to "OFF" in order to see how sluggish the UI would feel with a
        moderately slow connection.
      </p>
    </>
  )
}
