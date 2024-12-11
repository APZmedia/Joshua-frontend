const Formats = () => {
  const formats = [
    {
      id: 1,
      image: "./images/asimovmedia.gif",
      title: "Five pages Carousel",
      description: "A carousel of five pages of text, with two images",
      ratio: "4:5",
    },
    {
      id: 2,
      image: "./images/perspectivespodcast.gif",
      title: "Podcast covers",
      description: "A set of artwork for podcasts",
      ratio: "9:16",
    },
    {
      id: 3,
      image: "./images/questionforthefuture.gif",
      title: "Questions for the future",
      description: "A text driven video with a question for the future",
      ratio: "9:16",
    },
    {
      id: 4,
      image: "./images/savethechildren.gif",
      title: "New words",
      description: "A format with definitions of new words",
      ratio: "4:5",
    },
  ];

  return (
    <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
        Formats
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Choose your format
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {formats.map((format) => (
          <div
            key={format.id}
            className="overflow-hidden rounded-lg shadow-lg border border-stroke dark:border-strokedark"
          >
            <img
              src={format.image}
              alt={format.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  {format.title}
                </h3>
                <h2 className="text-xl font-light text-black items-end dark:text-white mb-2">
                  {format.ratio}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {format.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Formats;
