// import React from "react";
import { Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import { Mail, Phone, LocationOn } from "@mui/icons-material";

export const Contact = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card className="p-6">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="flex items-center mb-2">
              <Mail className="w-5 h-5 mr-2" /> support@mymechanic.com
            </p>
            <p className="flex items-center mb-2">
              <Phone className="w-5 h-5 mr-2" /> +91 98765 43210
            </p>
            <p className="flex items-center">
              <LocationOn className="w-5 h-5 mr-2" /> 123, Auto Street, New Delhi, India 
            </p>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="p-6">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium">Name</label>
                <TextField type="text" placeholder="Your Name" fullWidth required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <TextField type="email" placeholder="Your Email" fullWidth required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Message</label>
                <TextareaAutosize placeholder="Your Message" minRows={4} className="w-full p-2 border rounded" required />
              </div>
              <Button type="submit" variant="contained" color="primary" fullWidth>Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      {/* Map Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-center mb-4">Find Us Here</h2>
        <div className="w-full h-full">
          <iframe
            title="MyMechanic Location"
            className="w-full h-full rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83921276945!2d77.06889716958891!3d28.52728034206024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e16f6bdfbb%3A0x27b7058ef7a37e0a!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1619436183329!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};


