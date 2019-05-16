export const sampleData = {
    events: [
        {
          id: '1',
          title: 'Trip to Tower of London',
          date: '2018-03-27',
          category: 'culture',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
          city: 'London, UK',
          venue: "Tower of London, St Katharine's & Wapping, London",
          venueLatLng: {
            lat: 40.7484405,
            lng: -73.98566440000002
          },
          hostedBy: 'Bob',
          hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
          attendees: [
            {
              id: 'a',
              name: 'Bob',
              photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            }
          ]
        },
        {
          id: '2',
          title: 'Trip to Punch and Judy Pub',
          date: '2018-03-28',
          category: 'drinks',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
          city: 'London, UK',
          venue: 'Punch & Judy, Henrietta Street, London, UK',
          venueLatLng: {
            lat: 40.7484405,
            lng: -73.98566440000002
          },
          hostedBy: 'Tom',
          hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
          attendees: [
            {
              id: 'b',
              name: 'Tom',
              photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            },
            {
              id: 'a',
              name: 'Bob',
              photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            }
          ]
        }
    ]
}