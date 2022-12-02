import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import AuthService from "../../../services/Auth.service";
import { jwtSign } from "../../../utils/jwt";

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_AZURE_CLIENT_SECRET_VALUE as string,
      tenantId: process.env.NEXT_PUBLIC_AZURE_CLIENT_TENANT_ID,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        token.accessToken = account.access_token;

        try {
          const signedToken = jwtSign({
            id: user.id,
            name: user.name,
            email: user.email,
            msExp: account.expires_at,
            exp: account.expires_at,
          });

          const rsp = await AuthService.userLoginReq(signedToken);

          token.beToken = rsp.data.data.token;
        } catch (e: any) {
          console.log(e.response.data);
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      if (!token.beToken) {
        return {};
      }

      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.beToken = token.beToken;

      return session;
    },
  },
};

export default NextAuth(authOptions);
