import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import {
  BookUser,
  CreditCard,
  Globe,
  Keyboard,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <>
      <div className="flex items-center gap-4 hidden md:inline-flex">
        <a href="/global-opportunity">
          <Button
            type="submit"
            variant={"ghost"}
            className="hover:bg-accent transition-colors text-foreground/90"
          >
            <Globe height={17} />
            <span>Global Opportunity</span>
          </Button>
        </a>
        <a href="/my-opportunity">
          <Button
            type="submit"
            variant={"ghost"}
            className="hover:bg-accent transition-colors text-foreground/90"
          >
            <BookUser height={17} />
            <span>My Opportunity</span>
          </Button>
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="submit" variant={"outline"} className="h-9 pl-2 pr-3">
              <User height={17} />
              Account
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 pt-1 pb-1">
            <DropdownMenuLabel className="font-medium">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Settings height={17} />
                <span className="ml-1">Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOutAction}>
              <LogOut height={17} />
              <span className="ml-1">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="submit"
              variant={"outline"}
              className="hover:bg-accent transition-colors text-foreground/90"
            >
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-50 pt-1 pb-1">
            <DropdownMenuLabel className="font-normal">Menus</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <a href="/global-opportunity" className="flex items-center">
                  <Globe height={17} />
                  <span>Global Opportunity</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/my-opportunity" className="flex items-center">
                  <BookUser height={17} />
                  <span>My Opportunity</span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="font-normal">
              Account
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Settings height={17} />
                <span className="ml-1">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOutAction}>
                <LogOut height={17} />
                <span className="ml-1">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
