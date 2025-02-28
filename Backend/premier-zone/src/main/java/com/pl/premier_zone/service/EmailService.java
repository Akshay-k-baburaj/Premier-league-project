package com.pl.premier_zone.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendWelcomeEmail(String to, String username) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");

            helper.setTo(to);
            helper.setSubject("Welcome to Premier Zone!");

            // Create HTML content
            String htmlContent = createWelcomeEmailHtml(username);
            helper.setText(htmlContent, true); // true indicates this is HTML

            ClassPathResource logoResource = new ClassPathResource("static/images/img.png");
            helper.addInline("logo", logoResource);

            mailSender.send(mimeMessage);
        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private String createWelcomeEmailHtml(String username) {
        return "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Welcome to Premier Zone</title>\n" +
                "</head>\n" +
                "<body style=\"margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ade8f4;\">\n" +
                "    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                "        <tr>\n" +
                "            <td style=\"padding: 20px 0;\">\n" +
                "                <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" style=\"border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);\">\n" +
                "                    <tr>\n" +
                "                        <td align=\"center\" style=\"padding: 40px 0; background: linear-gradient(to right, #0077b6, #00b4d8); border-top-left-radius: 12px; border-top-right-radius: 12px;\">\n" +
                "                            <img src=\"cid:logo\" alt=\"Premier Zone Logo\" width=\"120\" style=\"display: block;\">\n" +
                "                            <h1 style=\"color: white; margin-top: 15px; font-size: 28px;\">Premier Zone</h1>\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                        <td style=\"padding: 40px 30px;\">\n" +
                "                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                "                                <tr>\n" +
                "                                    <td style=\"color: #1a202c; font-size: 24px; font-weight: bold;\">\n" +
                "                                        Welcome to Premier Zone, " + username + "!\n" +
                "                                    </td>\n" +
                "                                </tr>\n" +
                "                                <tr>\n" +
                "                                    <td style=\"padding: 20px 0; color: #4a5568; font-size: 16px; line-height: 24px;\">\n" +
                "                                        We're thrilled to have you join our community of Premier League fans and fantasy football enthusiasts. With Premier Zone, you'll get access to comprehensive statistics, player insights, and fantasy football analytics.\n" +
                "                                    </td>\n" +
                "                                </tr>\n" +
                "                                <tr>\n" +
                "                                    <td style=\"padding: 10px 0; color: #4a5568; font-size: 16px; line-height: 24px;\">\n" +
                "                                        What you can do with Premier Zone:\n" +
                "                                        <ul style=\"padding-left: 20px;\">\n" +
                "                                            <li>Track player and team statistics</li>\n" +
                "                                            <li>Get data-driven insights for your fantasy team</li>\n" +
                "                                            <li>Stay updated with the latest Premier League news</li>\n" +
                "                                            <li>Connect with other football fans</li>\n" +
                "                                        </ul>\n" +
                "                                    </td>\n" +
                "                                </tr>\n" +
                "                                <tr>\n" +
                "                                    <td style=\"padding: 20px 0;\">\n" +
                "                                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                "                                            <tr>\n" +
                "                                                <td align=\"center\">\n" +
                "                                                    <a href=\"http://localhost:3000/dashboard\" style=\"background: linear-gradient(to right, #0077b6, #00b4d8); border-radius: 6px; color: #ffffff; display: inline-block; font-size: 16px; font-weight: bold; padding: 12px 24px; text-decoration: none; transition: transform 0.3s ease;\">GET STARTED</a>\n" +
                "                                                </td>\n" +
                "                                            </tr>\n" +
                "                                        </table>\n" +
                "                                    </td>\n" +
                "                                </tr>\n" +
                "                            </table>\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                        <td style=\"padding: 30px; background: linear-gradient(to right, #0077b6, #00b4d8); border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;\">\n" +
                "                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                "                                <tr>\n" +
                "                                    <td style=\"color: #ffffff; font-size: 14px; text-align: center;\">\n" +
                "                                        <p style=\"margin: 0;\">© 2024 Premier Zone. All rights reserved.</p>\n" +
                "                                        <p style=\"margin: 10px 0 0 0;\">Your home for everything Premier League related!</p>\n" +
                "                                    </td>\n" +
                "                                </tr>\n" +
                "                            </table>\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                </table>\n" +
                "            </td>\n" +
                "        </tr>\n" +
                "    </table>\n" +
                "</body>\n" +
                "</html>";
    }
}