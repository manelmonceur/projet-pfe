import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt'; // Import JwtService

@Injectable()
export class ParentGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { } // Inject JwtService

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Assuming token is in the 'Authorization' header

    if (!token) {
      return false; // If token is not provided, deny access
    }

    const decodedToken = this.jwtService.decode(token); // Decode the token payload
    const role = decodedToken.role; // Extract the role from the token payload

    // Check if the user role is 'parent'
    return role === 'parent';
  }
}
