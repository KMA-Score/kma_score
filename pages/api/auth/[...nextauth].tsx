import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import AuthService from "../../../services/Auth.service";

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_AZURE_CLIENT_SECRET_VALUE as string,
      tenantId: process.env.NEXT_PUBLIC_AZURE_CLIENT_TENANT_ID,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token, user }: any) {
      try {
        const verifyRsp = await AuthService.verifyToken(token.accessToken);

        session.accessToken = token.accessToken;
        session.user.id = token.id;

        return session;
      } catch (e) {
        return {};
      }
    },
  },
};

export default NextAuth(authOptions);
