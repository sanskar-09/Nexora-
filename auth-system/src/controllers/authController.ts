import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public signUp = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.signUp(req.body);
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const token = await this.authService.login(req.body);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  public resetPassword = async (req: Request, res: Response) => {
    try {
      await this.authService.resetPassword(req.body);
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}