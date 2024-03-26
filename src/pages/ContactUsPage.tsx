import React from 'react';

const ContactPage = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission
  };

  return (
    <div className="bg-gray-50 px-4 py-16">
      <div className=" rounded-lg p-8 max-w-xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-serif font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border-gray-400 border-2 rounded-3xl p-2 focus:outline-none focus:border-red-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-serif font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-gray-400 border-2 rounded-3xl p-2 focus:outline-none focus:border-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
           />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-serif font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              className="w-full border-gray-400 border-2 rounded-3xl p-2 focus:outline-none focus:border-red-500 h-32 "
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col justify-end">
            <button
              type="submit"
              className="bg-sky-900 text-white py-2 px-4 rounded-3xl shadow-md font-semibold hover:bg-sky-900 focus:outline-none focus:shadow-outline-blue disabled:opacity-50"
              disabled={!name || !email || !message}
            >
              Send
            </button>
            <button
              type="button"
              className="border border-gray-400 text-gray-600 py-2 px-4 rounded-3xl shadow-md font-semibold hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:shadow-outline-gray mt-2"
              onClick={() => {
                setName('');
                setEmail('');
                setMessage('');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;